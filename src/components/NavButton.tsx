import { FC } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  active?: boolean;
}

const NavButton: FC<Props> = (props) => {
  const { active, children, ...otherProps } = props;
  return (
    <Button
      colorScheme={active ? "messenger" : "gray"}
      variant={active ? "solid" : "outline"}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

NavButton.defaultProps = {
  active: false,
};

export default NavButton;
