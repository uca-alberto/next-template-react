import { useEffect, useState } from "react";
import styles from "../../../styles/ImageUpload.module.css";
import { useToast } from "../../../contexts/toastProvider";

interface InputStandardProps {
  title?: string;
  value?: string;
  id?: string;
  error?: any;
  titleLabel?: string;
  isViewError?: boolean;
  errorView?: boolean;
  touched?: any;
  defaultValue?: string;
  isEdit?: boolean;
  onImageSelect: (image: any) => void;
  color?: string;
}
const ImageUpload = ({
  title = "",
  onImageSelect,
  id = "",
  error,
  titleLabel = "",
  isViewError = true,
  errorView = true,
  touched,
  defaultValue,
  isEdit,
  color = "#4f4f4f",
}: InputStandardProps) => {
  const { pushNotify } = useToast();
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    if (defaultValue && isEdit && defaultValue.charAt(0) !== "f") {
      setSelectedImage(`data:image/png;base64,${defaultValue}`);
    }
  }, [defaultValue]);

  const onFileSelected = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const MAX_SIZE_KB = 30;
      const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;

      if (file.size > MAX_SIZE_BYTES) {
        pushNotify(
          `El tamaño del archivo no debe exceder los ${MAX_SIZE_KB} KB.`,
          "error"
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSelectedImage(reader.result);
          onImageSelect(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const style = {
    color: color,
  };
  var inputColor = `text-[#391446] font-medium text-md `;

  return (
    <div className={styles["image-upload-container"]}>
      <label style={style} className={inputColor}>
        {titleLabel}
      </label>
      <label htmlFor={`${id}`} className={styles["image-upload-box"]}>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Image Preview"
            className={styles["image-preview"]}
          />
        ) : (
          <span>{title}</span>
        )}
      </label>
      <input
        id={`${id}`}
        type="file"
        onChange={onFileSelected}
        accept="image/*"
        className={styles["file-input"]}
      />
      {isViewError && (
        <div className="min-h-7 max-h-9 flex justify-end items-center mt-1">
          {errorView && touched && (
            <p className="text-red-400 text-sm font-mediun leading-5">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
