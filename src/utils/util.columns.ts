interface AnyObject {
  [key: string]: any;
}
interface Icolumns {
  title: string;
  field: string;
}

const columnsFilter = ({
  includeFields,
}: {
  includeFields: AnyObject;
}): AnyObject => {
  const newArr: Icolumns[] = [];

  Object.keys(includeFields).forEach((field) => {
    if (includeFields[field]) {
      newArr.push({
        title: includeFields[field],
        field,
      });
    }
  });

  const specialFields = ["createdAt", "updatedAt"];
  specialFields.forEach((field) => {
    if (includeFields[field] && !newArr.some((item) => item.field === field)) {
      newArr.push({ title: includeFields[field], field });
    }
  });

  return newArr;
};

export { columnsFilter };
