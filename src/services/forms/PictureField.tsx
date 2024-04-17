import classNames from "classnames";
import { useField } from "formik";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import FileInput from "../files/FileInput";
import useFileAsObjectURL from "../files/useFileAsObjectURL";
import { readFile } from "../files/utils";
import Button from "../ui/Button";

interface PictureProps {
  name: string;
  aspectRatio?: string;
}

export const PicturePreview: FunctionComponent<{
  picture: string;
  onDelete?(): void;
  aspectRatio?: string;
}> = ({ picture, onDelete, aspectRatio }) => {
  const objectURL = useFileAsObjectURL({ url: picture });

  return (
    <div className={"rounded bg-gray-100 p-s"}>
      {objectURL && (
        <Image
          alt={"Preview image"}
          className={classNames(
            "h-40 w-auto rounded object-cover",
            aspectRatio ? `aspect-[${aspectRatio}]` : undefined,
          )}
          height={0}
          src={objectURL.url}
          width={0}
          unoptimized
        />
      )}
      {onDelete && (
        <Button className={"bg-red-900 mt-s"} onClick={() => onDelete()}>
          Supprimer
        </Button>
      )}
    </div>
  );
};

export const Picture: FunctionComponent<PictureProps> = ({
  name,
  aspectRatio,
}) => {
  const [field, , helper] = useField<string | null>(name);

  return field.value ? (
    <PicturePreview
      aspectRatio={aspectRatio}
      onDelete={() => helper.setValue(null)}
      picture={field.value}
    />
  ) : (
    <FileInput
      accept={"image/*"}
      dragLabel={"Déposez l'image ici"}
      onChange={(list) =>
        readFile(list[0]).then((picture) => helper.setValue(picture))
      }
    />
  );
};
