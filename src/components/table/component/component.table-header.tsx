import { IPropsTableHeader } from "../../../utils/util.interface";

export const TableHeaderComponent = ({
  columnsState,
  voidEdit,
  voidDelete,
  voidView,
}: IPropsTableHeader) => {
  const columnCount =
    columnsState.length +
    (voidEdit ? 1 : 0) +
    (voidDelete ? 1 : 0) +
    (voidView ? 1 : 0);
  const width = `max-width: calc(100% / ${columnCount})`;
  return (
    <tr>
      {columnsState.length &&
        columnsState?.map((item: any, index: number) => (
          <CellComponent key={"th" + index} width={width}>
            {item?.title}
          </CellComponent>
        ))}
      {voidEdit && <CellComponent width={width}>Editar</CellComponent>}
      {voidDelete && <CellComponent width={width}>Eliminar</CellComponent>}
      {voidView && <CellComponent width={width}>Ver</CellComponent>}
    </tr>
  );
};

const CellComponent = ({
  children,
  width,
}: {
  children: React.ReactNode;
  width: string;
}) => {
  return (
    <th className="cell" style={{ width }}>
      <div>{children}</div>
    </th>
  );
};
