import "@src/styles/components/_divider.scss";

interface IDividerProps {
  label: string;
}

const Divider = ({
  label
}: IDividerProps) => {
  return (
    <div className='divider my-2'>
      <span>{label}</span>
    </div>
  );
};

export default Divider;
