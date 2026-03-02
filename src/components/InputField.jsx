const InputField = ({ label, value, onChange, textarea }) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label>{label}</label>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%" }}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
};

export default InputField;
