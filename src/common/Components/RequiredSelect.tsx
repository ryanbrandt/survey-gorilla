import { Select } from "handsome-ui";
import { GENERIC_REQUIRED_ERROR } from "../../utils/constants";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value: string;
  options: Array<string | Option>;

  onChange: (value: string) => void;
}

const RequiredSelect = (props: Props): React.ReactElement => {
  const { label, value, options, onChange } = props;

  return (
    <Select
      label={label}
      options={options}
      value={value}
      onChange={onChange}
      error={!value ? GENERIC_REQUIRED_ERROR : undefined}
    />
  );
};

export default RequiredSelect;
