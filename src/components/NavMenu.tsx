import { FC } from "react";
import { ButtonGroup } from "@chakra-ui/react";

// Project
import NavButton from "@/components/NavButton";

interface Props {
  items: string[];
  active?: number;
  onClick: (idx: number) => void;
}

const NavMenu: FC<Props> = (props) => {
  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      {props.items.map((item, idx) => (
        <NavButton
          key={item}
          active={idx == props.active}
          onClick={() => props.onClick(idx)}
        >
          {item}
        </NavButton>
      ))}
    </ButtonGroup>
  );
};

NavMenu.defaultProps = {
  active: 0,
};

export default NavMenu;
