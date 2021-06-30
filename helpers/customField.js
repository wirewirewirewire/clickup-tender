export default function customField(entry, search) {
  return entry.custom_fields
    ? entry.custom_fields.find((g) => g.name === search)
    : "Field not found";
}

export function customFieldOptions(entry, search) {
  const field = customField(entry, search);
  return field.type_config.options[field.value];
}
