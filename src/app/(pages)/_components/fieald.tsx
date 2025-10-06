interface FieldProps {
    label: string;
    value: React.ReactNode;
}

const Field = ({ label, value }: FieldProps) => {
    return ( 
    
    <div className="flex justify-between items-center border-b pb-2">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-900 text-right">{value}</span>
  </div> );
}
 
export default Field;