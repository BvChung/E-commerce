export interface FormInputProps {
	key?: string;
	id: string;
	type: string;
	name: string;
	value: string | number | readonly string[] | undefined;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	required: boolean;
	pattern?: string;
	label: string;
	errorMessage: string;
}
