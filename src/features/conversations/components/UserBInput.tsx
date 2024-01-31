import { TextInput, TextInputProps } from 'react-native';
import { CmIconButton } from '@shared/components';

interface Props {
  isEditable: boolean;
  expanded: boolean;
  userBName: string;
  setIsEditable: () => void;
  handleSaveField: () => void;
  handleCancelField: () => void;
}

type InputProps = TextInputProps & Props;

function UserBInput({ isEditable, expanded, userBName, setIsEditable, handleSaveField, handleCancelField, ...rest }: InputProps) {
  return (
    <>
      <TextInput editable={isEditable} {...rest} />
      {expanded && (
        <>
          {!isEditable && <CmIconButton onPress={setIsEditable} name={'edit'} source={'MaterialIcons'} color={'black'} size={22} />}
          {isEditable && userBName.length > 0 && <CmIconButton onPress={handleSaveField} name={'check'} source={'MaterialIcons'} color={'black'} size={22} />}
          {isEditable && <CmIconButton onPress={handleCancelField} name={'cross'} source={'Entypo'} color={'black'} size={22} />}
        </>
      )}
    </>
  );
}

export default UserBInput;
