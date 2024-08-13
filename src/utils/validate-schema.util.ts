import { format, parseISO } from "date-fns";
import { ErrorMessages } from "../enum/error-messages.enum";

interface ValidationResult {
  isValid: boolean;
  message?: string;
  path?: string;
}

const validateSchemaDate = (
  initialDate?: string,
  finalDate?: string,
  path?: string
): ValidationResult => {
  const dateInitial = initialDate ? new Date(initialDate) : null;
  const dateFinal = finalDate ? new Date(finalDate) : null;
  const currentDate = new Date();

  if (
    !initialDate &&
    finalDate &&
    finalDate.trim() !== "" &&
    path === "initialDate"
  ) {
    return {
      path: "initialDate",
      isValid: false,
      message: ErrorMessages.InitialDateRequired,
    };
  }

  if (
    !finalDate &&
    initialDate &&
    initialDate.trim() !== "" &&
    path === "finalDate"
  ) {
    return {
      path: "finalDate",
      isValid: false,
      message: ErrorMessages.FinalDateRequired,
    };
  }

  if (dateInitial && dateFinal && path === "initialDate") {
    if (dateInitial > dateFinal) {
      return {
        path: "initialDate",
        isValid: false,
        message: ErrorMessages.InitialDateAfterFinalDate,
      };
    }
  }

  if (dateInitial && dateFinal && path === "finalDate") {
    if (dateFinal < dateInitial) {
      return {
        path: "finalDate",
        isValid: false,
        message: ErrorMessages.FinalDateBeforeInitialDate,
      };
    }
  }

  if (dateInitial && dateInitial > currentDate && path === "initialDate") {
    return {
      path: "initialDate",
      isValid: false,
      message: ErrorMessages.InitialDateAfterCurrentDate,
    };
  }

  if (dateFinal && dateFinal > currentDate && path === "finalDate") {
    return {
      path: "finalDate",
      isValid: false,
      message: ErrorMessages.FinalDateAfterCurrentDate,
    };
  }

  return {
    isValid: true,
  };
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Añade cero delante si es necesario
  const day = date.getDate().toString().padStart(2, "0"); // Añade cero delante si es necesario
  return `${year}-${month}-${day}`;
};

const getFormattedDates = (): { dateNow: string; dateBefore: string } => {
  const date = new Date();
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const dateNow = formatDate(date);
  const dateBefore = formatDate(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
  );

  return { dateNow, dateBefore };
};

const getFormattedparseISO = (date: string): string => {
  return format(parseISO(date), "MM/dd/yyyy");
};

export {
  validateSchemaDate,
  formatDate,
  getFormattedDates,
  getFormattedparseISO,
};
