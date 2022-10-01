import { FC, MouseEventHandler } from "react";
import {
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { TbEye, TbEyeOff } from "react-icons/tb";

interface Props extends InputProps {
  show?: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>;
}

const PasswordInput: FC<Props> = (props) => {
  const { show, onToggle, ...otherProps } = props;

  return (
    <InputGroup size="md">
      <Input pr="4.5rem" type={show ? "text" : "password"} {...otherProps} />
      <InputRightElement width="4.5rem">
        <IconButton
          aria-label={show ? "Hide password" : "Show password"}
          h="1.75rem"
          size="sm"
          icon={show ? <Icon as={TbEyeOff} /> : <Icon as={TbEye} />}
          onClick={onToggle}
        />
      </InputRightElement>
    </InputGroup>
  );
};

PasswordInput.defaultProps = {
  show: false,
  placeholder: "Show password",
};

export default PasswordInput;
