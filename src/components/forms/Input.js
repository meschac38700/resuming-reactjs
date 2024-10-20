import { AnimatePresence } from "framer-motion";
import { useId } from "react";
import { useFormContext } from "react-hook-form";
import InputError from "./error";

export default function Input({
	type,
	label,
	name,
	help,
	placeholder,
	required,
}) {
	const id = useId();
	const {
		register,
		formState: { errors },
	} = useFormContext();

	let errorMessage = "";

	if (Object.keys(errors).length) {
		errorMessage = errors[name]?.message;
	}
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
				{...register(name, {
					required: {
						value: required,
						message: `Field '${label}' is required.`,
					},
				})}
			/>
			<AnimatePresence mode="wait" initial={false}>
				{errorMessage && (
					<InputError message={errorMessage} key={errorMessage} />
				)}
			</AnimatePresence>

			{help && (
				<small id={id + "HelpInline"} className="text-muted">
					{help}
				</small>
			)}
		</div>
	);
}
