import {
  // eslint-disable-next-line no-restricted-imports
  Formik,
  FormikValues,
  // eslint-disable-next-line no-restricted-imports
  Form as FForm,
  validateYupSchema,
  yupToFormErrors,
  useFormikContext,
  getIn as formikGetIn,
} from "formik";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { AnySchema, ArraySchema, BaseSchema, ObjectSchema } from "yup";
import { ObjectShape } from "yup/lib/object";
import { FormikHelpers } from "formik/dist/types";
import { getIn as yupGetIn } from "yup";
import { forEach } from "property-expr";

interface YupSchemaAPI {
  schema: BaseSchema;
  context?: Record<string, unknown>;
}
export const YupSchemaContext = createContext<YupSchemaAPI | null>(null);

export function useYupSchemaContext(): YupSchemaAPI {
  return useContext(YupSchemaContext) as YupSchemaAPI;
}

const trim = (part: string) => part.substring(0, part.length - 1).substring(1);

function getDependencies(
  schema: AnySchema,
  path: string,
  value?: unknown,
  context: unknown = value,
) {
  let parent: unknown, lastPartDebug: string;
  const dependencies: string[] = [];

  // root path: ''
  if (!path) return [];

  forEach(path, (_part, isBracket, isArray) => {
    const part = isBracket ? trim(_part) : _part;

    schema = schema.resolve({ context, parent, value });

    if ("innerType" in schema && (schema as ArraySchema<AnySchema>).innerType) {
      const idx = isArray ? parseInt(part, 10) : 0;

      if (value && idx >= (value as Array<unknown>).length) {
        throw new Error(
          `Yup.reach cannot resolve an array item at index: ${_part}, in the path: ${path}. ` +
            `because there is no value at that index. `,
        );
      }
      parent = value;
      value = value && (value as Array<unknown>)[idx];
      schema = (schema as ArraySchema<AnySchema>).innerType as AnySchema;
      dependencies.push(...(schema as ArraySchema<AnySchema>).deps);
    }

    // sometimes the array index part of a path doesn't exist: "nested.arr.child"
    // in these cases the current part is the next schema and should be processed
    // in this iteration. For cases where the index signature is included this
    // check will fail and we'll handle the `child` part on the next iteration like normal
    if (!isArray) {
      if (
        !("fields" in schema) ||
        !(schema as ObjectSchema<ObjectShape>).fields ||
        !(schema as ObjectSchema<ObjectShape>).fields[part]
      )
        throw new Error(
          `The schema does not contain the path: ${path}. ` +
            `(failed at: ${lastPartDebug} which is a type: "${schema._type}")`,
        );

      parent = value;
      value = value && (value as Record<string, unknown>)[part];
      schema = (schema as ObjectSchema<ObjectShape>).fields[part] as AnySchema;
      dependencies.push(...(schema as ObjectSchema<ObjectShape>).deps);
    }

    lastPartDebug = isBracket ? "[" + _part + "]" : "." + _part;
  });

  return dependencies;
}

export function useYupField(name: string): AnySchema | null {
  const { schema, context } = useYupSchemaContext();
  const { values } = useFormikContext();

  const dependencies = useMemo(
    () => getDependencies(schema, name, values, context),
    [schema, name, values, context],
  );
  const mappedDependencies = useMemo(
    () => dependencies.map((d) => formikGetIn(values, d)),
    [dependencies, values],
  );

  return useMemo(() => {
    const reached = yupGetIn(schema, name, values, context);

    return reached.schema.resolve({
      context,
      parent: reached.parent,
      value: reached.parent ? reached.parent[reached.parentPath] : values,
    });
    /*
     This is some temporary code to allow performance optimization,
     for the right usage we should use a value created from dependencies and create memoization on the global ref
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema, name, context, ...mappedDependencies]);
}

interface Props<Values extends FormikValues> {
  children: ReactNode;
  initialValues: Partial<Values>;
  enableReinitialize?: boolean;
  onSubmit: (
    values: Values,
    formikHelpers: FormikHelpers<Values>,
  ) => Promise<unknown>;
  schema?: BaseSchema;
  schemaContext?: Record<string, unknown>;
}

const Form = <Values extends FormikValues>({
  initialValues,
  onSubmit,
  enableReinitialize = false,
  children,
  schema,
  schemaContext,
}: Props<Values>): JSX.Element => {
  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      onSubmit={(values, formikHelpers) => {
        return onSubmit(
          schema
            ? schema.validateSync(values, { context: schemaContext })
            : values,
          formikHelpers,
        );
      }}
      validate={(values) => {
        try {
          validateYupSchema(values, schema, true, schemaContext);
        } catch (e) {
          return yupToFormErrors(e);
        }
        return {};
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      <YupSchemaContext.Provider
        value={schema ? { schema, context: schemaContext } : null}
      >
        <FForm noValidate>{children}</FForm>
      </YupSchemaContext.Provider>
    </Formik>
  );
};

export default Form;
