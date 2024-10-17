import { useId } from "react";

export default function Input({ type, label, name, help, placeholder }) {
	const id = useId();

	return (
		<div className="form-group mb-3">
			<label className="form-label" htmlFor={id}>
				{label}
			</label>
			<input
				className="form-control"
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
			/>
			{help && (
				<small id={id + "HelpInline"} className="text-muted">
					{help}
				</small>
			)}
		</div>
	);
}
