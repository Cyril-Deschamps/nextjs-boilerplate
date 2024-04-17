import { ComponentType, FunctionComponent } from "react";
import { useTranslation } from "next-i18next";
import logger from "../i18n/logger";
import { useFormikContext } from "formik";

interface Props {
  errors?: unknown;
}

const ValidationsErrors: FunctionComponent<Props> = ({
  errors: propsErrors,
}) => {
  const { t } = useTranslation(["validations"]);
  const { errors: formikErrors } = useFormikContext();

  const errors = propsErrors ? propsErrors : formikErrors;

  if (errors && typeof errors == "object") {
    if (Object.keys(errors).length === 0) return null;

    return (
      <>
        {Object.entries(errors).map(([field, e]) => {
          if (typeof e === "object" && !("key" in e)) {
            return (
              <li key={field}>
                <ValidationsErrors errors={e} />
              </li>
            );
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          /* @ts-ignore */
          const tr = t(`validations:${e.key}`, e.values);
          if (!tr || tr === "undefined") {
            logger.error(
              `Une validation n'a pas été renseignée pour le champ ${field}`,
              e.key,
              `validations:${e.key}`,
              e.values,
            );
            return null;
          }
          return <li key={field}>{tr as string}</li>;
        })}
      </>
    );
  }

  return null;
};

export function withValidationsErrorWrapper<P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function ValidationsErrorWrapper(props: P) {
    const { errors: formikErrors } = useFormikContext();

    if (
      formikErrors &&
      typeof formikErrors === "object" &&
      Object.keys(formikErrors).length === 0
    ) {
      return <WrappedComponent {...props} />;
    }

    return (
      <div className={"bg-red-50 border-l-8 border-red-900 rounded mb-l"}>
        <div className={"flex items-center"}>
          <div className={"p-2"}>
            <div className={"flex items-center"}>
              <div className={"ml-2"}>
                <svg
                  className={"h-8 w-8 text-red-900 mr-2 cursor-pointer"}
                  fill={"none"}
                  stroke={"currentColor"}
                  viewBox={"0 0 24 24"}
                  xmlns={"http://www.w3.org/2000/svg"}
                >
                  <path
                    d={
                      "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    }
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    strokeWidth={"2"}
                  />
                </svg>
              </div>
              <ul className={"text-xs pl-xs"}>
                <WrappedComponent {...props} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  ValidationsErrorWrapper.displayName = `withValidationsErrorWrapper(${displayName})`;

  return ValidationsErrorWrapper;
}

export default withValidationsErrorWrapper(ValidationsErrors);
