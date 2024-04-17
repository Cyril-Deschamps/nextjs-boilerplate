import React, { useEffect, useMemo, useRef, useState } from "react";
import { useField } from "formik";
import { useYupField } from "./Form";
import { AnySchema, BaseSchema } from "yup";
import { debounce } from "../utils/debounce";
import Image from "next/image";
import Downshift, { GetItemPropsOptions } from "downshift";
import classNames from "classnames";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  className: string;
  icon?: string;
}

export type AutocompleteItem = {
  id: string | number;
  label: string;
  legend: string;
};

const SuggestionField = ({
  name,
  className,
  ...otherProps
}: Props): JSX.Element => {
  const cancelToken = useRef<Record<string, never> | null>(null);
  const customInputRef = useRef<HTMLInputElement>(null);
  const debouncedRequest = useRef(
    debounce((text: string) => {
      const currentCancelToken = {};
      cancelToken.current = currentCancelToken;

      try {
        suggestion!.autocompleteRequest(text).then((data) => {
          if (currentCancelToken === cancelToken.current) {
            const perfectMatch = data.find(
              (item: AutocompleteItem) => item.label === text,
            );
            if (perfectMatch) {
              setItems([]);
              helper.setValue(perfectMatch.id);
            } else setItems(data);
          }
        });
      } catch {
        /* Handle error */
      }
    }, 300),
  );

  const [field, , helper] = useField(name);
  const fieldSchema = useYupField(name) as AnySchema;
  const { suggestion } = fieldSchema.meta() as NonNullable<
    BaseSchema["metaInterface"]
  >;
  const [items, setItems] = useState<AutocompleteItem[]>([]);
  const [currentText, setCurrentText] = useState<AutocompleteItem["label"]>("");
  const [showSuggestions, setShowSuggestion] = useState(false);
  const [hasBeenFocused, setHasBeenFocused] = useState(false);

  const selectedItem = useMemo(
    () => items.find((item) => item.label === currentText),
    [currentText, items],
  );

  useEffect(() => {
    debouncedRequest.current(currentText);
  }, [currentText, debouncedRequest, suggestion]);

  const fieldScroll = () => {
    if (typeof window !== "undefined") {
      const y =
        customInputRef.current!.getBoundingClientRect().top +
        window.scrollY -
        100;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Downshift
      id={otherProps.id}
      isOpen={showSuggestions}
      itemToString={(item: AutocompleteItem | null) => (item ? item.label : "")}
      onChange={(selectedItem: AutocompleteItem | null) => {
        if (selectedItem) {
          helper.setValue(selectedItem.id);
          setCurrentText(selectedItem.label);
        }
      }}
      onOuterClick={() => setShowSuggestion(false)}
      onSelect={() => setShowSuggestion(false)}
      selectedItem={selectedItem ?? null}
    >
      {({ getItemProps, getMenuProps, isOpen, highlightedIndex }) => (
        <div className={"relative"}>
          <input
            ref={customInputRef}
            className={classNames(
              className,
              `${
                hasBeenFocused
                  ? field.value
                    ? "border-green"
                    : "border-red-500"
                  : ""
              }`,
            )}
            onChange={(e) => {
              setCurrentText(e.target.value);
              if (field.value && field.value !== null) helper.setValue(null);
            }}
            onFocus={() => {
              if (!hasBeenFocused) setHasBeenFocused(true);
              setShowSuggestion(true);
              fieldScroll();
            }}
            placeholder={otherProps.placeholder}
            value={currentText}
          />
          {isOpen && items.length > 0 && (
            <ul
              {...getMenuProps({
                className:
                  "absolute z-20 w-full mt-2 border bg-white rounded-md shadow-xl",
              })}
            >
              <ItemsDropdown
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
                icon={otherProps.icon}
                items={items}
              />
            </ul>
          )}
        </div>
      )}
    </Downshift>
  );
};

const ItemsDropdown = ({
  items,
  getItemProps,
  highlightedIndex,
  icon,
}: {
  items: AutocompleteItem[];
  getItemProps: (
    options: GetItemPropsOptions<
      | AutocompleteItem
      | {
          label: string;
          id: null;
        }
    >,
  ) => object;
  icon?: string;
  highlightedIndex: number | null;
}): JSX.Element => {
  return (
    <>
      {items.map((item, index) => (
        <li
          key={item.id}
          {...getItemProps({
            index,
            item,
            className: `${
              highlightedIndex === index ? "bg-gray-100" : ""
            } flex items-center px-3 py-3 text-sm text-gray-600 transition-colors duration-300 transform hover:bg-gray-100 cursor-pointer`,
          })}
        >
          {icon && (
            <Image
              alt={"icon-suggestion"}
              className={"w-5 ml-2 mr-1"}
              src={icon}
            />
          )}
          <div>
            <p className={"font-bold ml-4"}>{item.label}</p>
            <p className={"font-light ml-4"}>{item.legend}</p>
          </div>
        </li>
      ))}
    </>
  );
};

export default SuggestionField;
