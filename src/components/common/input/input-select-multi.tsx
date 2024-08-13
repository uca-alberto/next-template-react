import Select from "react-select";
interface InputStandardProps {
  title?: string;
  options?: any;
  values: any;
  name?: string;
  onCategorieSelect?: any;
  color?: string;
}

const InputSelectMulti = ({
  options = [],
  title = "",
  onCategorieSelect,
  values,
  name,
  color = "#4f4f4f",
}: InputStandardProps) => {
  const style = {
    color: color,
  };
  var inputColor = `text-[#391446] font-medium text-md`;
  return (
    <div className="w-full mt-2 mb-2">
      <span style={style} className={inputColor}>
        {title}
      </span>
      <Select
        value={values}
        isMulti
        name={name}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onCategorieSelect}
      />
    </div>
  );
};
export default InputSelectMulti;
