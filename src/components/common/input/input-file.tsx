import { useEffect, useState } from "react";
import { InputFileProps } from "../../../utils/util.interface";

const FileUpload = ({
  title,
  name,
  value,
  buttonTitle,
  selectItem,
  border = false,
  description,
  fileWeight = 1,
  formats = [],
  error,
  touched,
  width,
  height,
}: InputFileProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorFile, setError] = useState<string>("");
  const stringFormats = formats.join(", ");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const leadImage = (file: File) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  useEffect(() => {
    if (value && isValidImageUrl(value)) {
      setPreviewUrl(value);
    } else if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  }, [value, selectedFile]);

  const handleFileChange = async (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validar el tamaño del archivo
      const maxSize = fileWeight * 1024 * 1024; // MB
      if (file.size > maxSize) {
        setError(`El archivo no debe superar ${fileWeight} MB.`);
        setSelectedFile(null);

        return;
      }

      // Validar el tipo de archivo
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError(`Solo se permiten archivos ${stringFormats}`);
        setSelectedFile(null);
        return;
      }

      const allowedFormats = (c: string) => stringFormats.includes(c);
      //valida la resolucion
      if (
        file.type.includes("image") &&
        ["jpg", "png"].some(allowedFormats) &&
        width &&
        height
      ) {
        try {
          const img = await leadImage(file);

          if (img.width !== width || img.height !== height) {
            setError(
              `La resolución de la imagen debe ser ${width}x${height} píxeles.`
            );
            setSelectedFile(null);
            return true;
          }
        } catch (error) {
          setError("Error al cargar la imagen.");
          setSelectedFile(null);
        }
      }

      setSelectedFile(file);
      setError("");
      selectItem?.(file);
    }
  };

  const isValidImageUrl = (url: any) => {
    return /\.(jpg|jpeg|png|svg)$/.test(url);
  };

  return (
    <div
      className={
        border
          ? "flex flex-col items-center py-4 border rounded-md border-gray-400 w-full"
          : "flex flex-col items-center py-4 w-full"
      }
    >
      <h1 className="text-[#391446] font-medium text-md ">{title}</h1>
      <input
        id={name}
        name={name}
        type="file"
        accept={stringFormats}
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor={name}
        className="bg-[#8F8EAC] text-white py-2 px-4 rounded-md cursor-pointer transition duration-300 hover:bg-[#DC8436]"
      >
        {buttonTitle}
      </label>

      {description &&
        description.map((x, i) => (
          <p key={i} className="pt-0.5 text-xs text-slate-500">
            {x}
          </p>
        ))}

      {(selectedFile || value) && (
        <div className="mt-4 contents">
          <p className="text-sm">Archivo seleccionado: {selectedFile?.name}</p>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Vista previa"
              className="w-72 mt-2 rounded"
            />
          )}
        </div>
      )}
      {errorFile && <p className="text-red-500 mt-2">{errorFile}</p>}
      {touched && (
        <p className="text-red-400 text-sm font-mediun leading-5">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
