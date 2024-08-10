import { MdOutlineClose } from "react-icons/md";
import './color-picker.scss';

interface IColorPickerProps {
  show: boolean;
  trigger: React.ReactNode;
  onChange: (color: string|null) => void;
}

const ColorPicker = ({ show, trigger, onChange }: IColorPickerProps) => {
  const colors = [
    null,
    '#BAE2FF',
    '#B9FFDD',
    '#FFE8AC',
    '#FFCAB9',
    '#F99494',
    '#9DD6FF',
    '#ECA1FF',
    '#DAFF8B',
    '#FFA285',
    '#CDCDCD',
    '#979797',
    '#A99A7C'
  ];

  function handleColorChange(color: string|null) {
    onChange(color);
  }

  return (
    <div className='color-picker'>
      <div className='trigger-by-icon'>
        {trigger} 
      </div>
      {show && (
        <div className='color-picker-content'>
          {colors.map((color) => (
            <div 
              key={color || 'no-color'} 
              className='color-picker-item'
              style={{ backgroundColor: color || '#ffffff' }}
              onClick={() => handleColorChange(color)}
            >
              {!color && <MdOutlineClose size={24} color="#51646E" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
