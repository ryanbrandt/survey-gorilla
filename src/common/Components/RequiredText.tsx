import { Text } from "handsome-ui";
import { GENERIC_REQUIRED_ERROR } from "../../utils/constants";

interface Props {
  label?: string;
  help?: string;
  placeholder?: string;
  value?: string;

  onChange: (value: string) => void;
}

const RequiredText = (props: Props): React.ReactElement => {
  const { label, help, value, onChange } = props;

  return (
    <Text
      label={label}
      value={value}
      help={help}
      onChange={onChange}
      error={!value ? GENERIC_REQUIRED_ERROR : undefined}
    />
  );
};

export default RequiredText;
