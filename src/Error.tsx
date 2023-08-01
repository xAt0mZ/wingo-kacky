import { useRouteError } from 'react-router-dom';

type RouterError = {
  status: number;
  statusText?: string;
  message?: string;
  data?: string;
};

export function ErrorPage() {
  const error = useRouteError() as RouterError;
  console.error(error);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error.status} {error.statusText}
        </i>
      </p>
      <p>
        <i>{error.message || error.data}</i>
      </p>
    </div>
  );
}
