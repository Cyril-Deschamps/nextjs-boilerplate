import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import {
  ToastConsumer,
  ToastConsumerContext,
  ToastProvider,
} from "react-toast-notifications";
import { Namespace, TFuncKey } from "react-i18next";
import { useTranslation } from "next-i18next";
import { StringMap, TOptions } from "i18next";

interface ToastAPI {
  toastSuccess(title: string, description?: string): void;
  toastError(title: string, description?: string): void;
  toastWarning(title: string, description?: string): void;
  toastInfo(title: string, description?: string): void;
}

const ToastNotificationsContext = createContext<ToastAPI>({
  toastError(): void {
    // Impossible https://youtu.be/Mhj15W23IjA?t=68
  },
  toastInfo(): void {
    // Impossible https://youtu.be/Mhj15W23IjA?t=68
  },
  toastWarning(): void {
    // Impossible https://youtu.be/Mhj15W23IjA?t=68
  },
  toastSuccess() {
    // Impossible https://youtu.be/Mhj15W23IjA?t=68
  },
});

const renderContent = (title: string, description?: string) => {
  return (
    <div>
      <div>{title}</div>
      {!!description && <div>{description}</div>}
    </div>
  );
};

const ToastGenerator = ({
  toaster: { add },
  children,
}: {
  toaster: ToastConsumerContext;
  children: ReactNode;
}) => {
  const toastSuccess = useCallback(
    (title: string, description?: string) => {
      add(renderContent(title, description), {
        appearance: "success",
      });
    },
    [add],
  );

  const toastError = useCallback(
    (title: string, description?: string) => {
      add(renderContent(title, description), {
        appearance: "error",
      });
    },
    [add],
  );

  const toastWarning = useCallback(
    (title: string, description?: string) => {
      add(renderContent(title, description), {
        appearance: "warning",
      });
    },
    [add],
  );

  const toastInfo = useCallback(
    (title: string, description?: string) => {
      add(renderContent(title, description), {
        appearance: "info",
      });
    },
    [add],
  );

  return (
    <ToastNotificationsContext.Provider
      value={{ toastSuccess, toastError, toastWarning, toastInfo }}
    >
      {children}
    </ToastNotificationsContext.Provider>
  );
};

export const ProvideToast: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ToastProvider placement={"top-right"} autoDismiss>
      <ToastConsumer>
        {(toaster) => (
          <ToastGenerator toaster={toaster}>{children}</ToastGenerator>
        )}
      </ToastConsumer>
    </ToastProvider>
  );
};

/**
 * @deprecated Please use useToastsWithIntl
 */
export const useToasts = (): ToastAPI => {
  return useContext(ToastNotificationsContext);
};

interface ToastAPIWithIntl<N extends Namespace> {
  toastSuccess<
    TKeysTitle extends TFuncKey<N> | TemplateStringsArray extends infer A
      ? A
      : never,
    TKeysDesc extends TFuncKey<N> | TemplateStringsArray extends infer A
      ? A
      : never,
    TInterpolationMapTitle extends Record<string, unknown> = StringMap,
    TInterpolationMapDesc extends Record<string, unknown> = StringMap,
  >(
    title: TKeysTitle | TKeysTitle[],
    description?: TKeysDesc | TKeysDesc[],
    options?: TOptions<TInterpolationMapTitle> &
      TOptions<TInterpolationMapDesc>,
    defaultValue?: string,
  ): void;
  toastWarning<
    TKeysTitle extends TFuncKey<N> | TemplateStringsArray extends infer A
      ? A
      : never,
    TKeysDesc extends TFuncKey<N> | TemplateStringsArray extends infer A
      ? A
      : never,
    TInterpolationMapTitle extends Record<string, unknown> = StringMap,
    TInterpolationMapDesc extends Record<string, unknown> = StringMap,
  >(
    title: TKeysTitle | TKeysTitle[],
    description?: TKeysDesc | TKeysDesc[],
    options?: TOptions<TInterpolationMapTitle> &
      TOptions<TInterpolationMapDesc>,
    defaultValue?: string,
  ): void;
  toastError<
    TKeysTitle extends TFuncKey<N> | TemplateStringsArray extends infer A
      ? A
      : never,
    TKeysDesc extends TFuncKey<N> | TemplateStringsArray extends infer A
      ? A
      : never,
    TInterpolationMapTitle extends Record<string, unknown> = StringMap,
    TInterpolationMapDesc extends Record<string, unknown> = StringMap,
  >(
    title: TKeysTitle | TKeysTitle[],
    description?: TKeysDesc | TKeysDesc[],
    options?: TOptions<TInterpolationMapTitle> &
      TOptions<TInterpolationMapDesc>,
    defaultValue?: string,
  ): void;
  toastInfo<
    TKeysTitle extends TFuncKey<N> | TemplateStringsArray extends infer A
      ? A
      : never,
    TKeysDesc extends TFuncKey<N> | TemplateStringsArray extends infer A
      ? A
      : never,
    TInterpolationMapTitle extends Record<string, unknown> = StringMap,
    TInterpolationMapDesc extends Record<string, unknown> = StringMap,
  >(
    title: TKeysTitle | TKeysTitle[],
    description?: TKeysDesc | TKeysDesc[],
    options?: TOptions<TInterpolationMapTitle> &
      TOptions<TInterpolationMapDesc>,
    defaultValue?: string,
  ): void;
}

export function useToastsWithIntl<N extends Namespace>(
  ns?: N,
): ToastAPIWithIntl<N> {
  const {
    toastSuccess: baseSuccess,
    toastError: baseError,
    toastWarning: baseWarning,
    toastInfo: baseInfo,
  } = useContext(ToastNotificationsContext);
  const { t } = useTranslation(ns);

  const toastSuccess = useCallback<ToastAPIWithIntl<N>["toastSuccess"]>(
    (title, description, options, defaultValue) => {
      return baseSuccess(
        (defaultValue
          ? t(title, defaultValue, options)
          : t(title, options)) as string,
        description ? (t(description, options) as string) : undefined,
      );
    },
    [t, baseSuccess],
  );

  const toastError = useCallback<ToastAPIWithIntl<N>["toastError"]>(
    (title, description, options, defaultValue) => {
      return baseError(
        (defaultValue
          ? t(title, defaultValue, options)
          : t(title, options)) as string,
        description ? (t(description, options) as string) : undefined,
      );
    },
    [t, baseError],
  );

  const toastWarning = useCallback<ToastAPIWithIntl<N>["toastWarning"]>(
    (title, description, options, defaultValue) => {
      return baseWarning(
        (defaultValue
          ? t(title, defaultValue, options)
          : t(title, options)) as string,
        description ? (t(description, options) as string) : undefined,
      );
    },
    [t, baseWarning],
  );

  const toastInfo = useCallback<ToastAPIWithIntl<N>["toastInfo"]>(
    (title, description, options, defaultValue) => {
      return baseInfo(
        (defaultValue
          ? t(title, defaultValue, options)
          : t(title, options)) as string,
        description ? (t(description, options) as string) : undefined,
      );
    },
    [t, baseInfo],
  );

  return {
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo,
  };
}
