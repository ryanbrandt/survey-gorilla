import { Input } from "handsome-ui";
import { GENERIC_REQUIRED_ERROR } from "../../utils/constants";

interface Props {
  label?: string;
  help?: string;
  type?: "text" | "number" | "date";
  value?: string | number;

  onChange: (value: string) => void;
}

const RequiredInput = (props: Props): React.ReactElement => {
  const { label, help, value, type = "text", onChange } = props;

  return (
    <Input
      label={label}
      value={value}
      help={help}
      type={type}
      onChange={onChange}
      error={!value ? GENERIC_REQUIRED_ERROR : undefined}
    />
  );
};

export default RequiredInput;
