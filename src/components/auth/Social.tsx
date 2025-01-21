
import { Button } from "../ui/button";


export const Social = () => {

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full flex items-center gap-x-2"
        variant="outline"
        onClick={() => {}}
      >
        <p>google signup</p>
        <img src="/google.png" alt="Google" width={20} height={20} />
      </Button>
      <Button
        size="lg"
        className="w-full flex items-center gap-x-2"
        variant="outline"
        onClick={() => {}}
      >
        <p>github signup</p>
        <img
          src="/github.png"
          alt="Github"
          width={20}
          height={20}
          className="dark:bg-white dark:rounded-2xl dark:shadow-md"
        />
      </Button>
    </div>
  );
};
