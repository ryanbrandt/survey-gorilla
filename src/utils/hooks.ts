import { useDispatch } from "react-redux";

type IPromisifedAction = (resolve: any, reject: any) => void;

interface IPromisifiedDispatchParams {
  onStart?: () => void;
  onThen?: () => void;
  onError?: () => void;
  onEnd?: () => void;
}

export const usePromisifedDispatch = (
  action: IPromisifedAction,
  params: IPromisifiedDispatchParams
): (() => Promise<void>) => {
  const dispatch = useDispatch();

  const { onStart, onThen, onError, onEnd } = params;
  return async () => {
    if (onStart) {
      onStart();
    }

    await new Promise((resolve, reject) => {
      dispatch(action(resolve, reject));
    })
      .then(() => {
        if (onThen) {
          onThen();
        }
      })
      .catch(() => {
        if (onError) {
          onError();
        }
      })
      .finally(() => {
        if (onEnd) {
          onEnd();
        }
      });
  };
};
