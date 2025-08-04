import { ProgressBar, ProgressBarProps } from 'primereact/progressbar';

interface Props extends ProgressBarProps {
  isLoading: boolean;
}

const Loading = (props: Props) => {
  if (props.isLoading) {
    return (
      <ProgressBar
        {...props}
        mode="indeterminate"
        style={{ ...props.style, height: props.style?.height ?? '5px' }}
      />
    );
  }
  return null;
};

export default Loading;
