interface Props {
  successMessage?: string;
  errorMessage?: string;
}

const ErrorAndSuccessSection = (props: Props): React.ReactElement => {
  const { successMessage, errorMessage } = props;

  return (
    <div className="message_section-container flex_center-col">
      {successMessage && (
        <label className="app-success">{successMessage}</label>
      )}
      {errorMessage && <label className="app-warning">{errorMessage}</label>}
    </div>
  );
};

export default ErrorAndSuccessSection;
