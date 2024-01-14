export interface OrderByProps {
	values: string[];
	text?: string;
	defaultValue: string;
	setFilter: (value: string) => void
}

export const OrderBy = ({
	values = [],
	text,
	defaultValue = "",
	setFilter,
}: OrderByProps) => {

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter(event.target.value);
	}

	return (
		<div className="text-center">
			<span className="h6">{text}</span>
			<select className="form-control form-select form-control-sm" defaultValue={defaultValue} onChange={handleChange}>
				<option value={defaultValue}>{defaultValue}</option>
				{values.map((value, index) => (
					<option key={index} value={value}>{value}</option>
				))}
			</select>
		</div>
	);
};
