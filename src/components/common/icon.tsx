import {
     RiGiftLine,
     RiDashboardLine,
     RiMapLine,
     RiCheckboxMultipleFill,
     RiContactsLine,
     RiCheckboxMultipleBlankFill,
     RiCheckboxMultipleBlankLine,
     RiClipboardLine,

} from "@remixicon/react";

interface IconProps {
     name: string;
     color?: string;
     size?: number;
}

const Icon = ({
     name,
     color = "purple",
     size = 22,
}: IconProps) => {
     switch (name) {
          case "RiDashboardLine":
               return <RiDashboardLine color={color} size={size} />;
          case "RiMapLine":
               return <RiMapLine color={color} size={size} />;
          case "RiContactsFill":
               return <RiContactsLine color={color} size={size} />;
          case "RiCheckboxMultipleFill":
               return <RiCheckboxMultipleFill color={color} size={size} />;
          case "RiContactsLine":
               return <RiContactsLine color={color} size={size} />;
          case "RiCheckboxMultipleBlankFill":
               return <RiCheckboxMultipleBlankFill color={color} size={size} />;
          case "RiCheckboxMultipleBlankLine":
               return <RiCheckboxMultipleBlankLine color={color} size={size} />;
          case "RiClipboardLine":
               return <RiClipboardLine color={color} size={size} />;
          default:
               return <RiGiftLine color={color} size={size} />;
     }
};
export default Icon;

// Path: src/components/common/icon.tsx
// search more icon: https://react-icons-v2.vercel.app/icons/ri
// package: https://www.npmjs.com/package/@remixicon/react in remixicon