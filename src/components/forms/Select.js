import { useId } from "react";
import { useFormContext } from "react-hook-form";

export default function Select({ options, label, name, help, required }) {
	const id = useId();
	const { register } = useFormContext();
	const defaultValue = options.filter((opt) => opt.selected)?.[0].value;
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<label className="input-group-text" htmlFor={"inputGroupSelect" + id}>
					{label}
				</label>
			</div>
			<select
				className="custom-select form-control"
				name={name}
				id={"inputGroupSelect" + id}
				defaultValue={defaultValue}
				{...register(name, {
					required: {
						value: required,
						message: `Field '${label}' is required.`,
					},
				})}
			>
				{options.map((opt) => (
					<option value={opt.value} key={opt.value}>
						{opt.text}
					</option>
				))}
			</select>
			{help && (
				<small
					style={{ display: "block", width: "100%" }}
					id={id + "HelpInline"}
					className="text-muted"
				>
					{help}
				</small>
			)}
		</div>
	);
}
