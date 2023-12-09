import BaseBackground from "@/components/BaseBackground";
import Button from "@/components/Button";
import { api } from "@/utils/api";

const ApiPlayground = () => {
  const createApiKey = api.apiPlayground.createApiKey.useMutation();

  const generateApiKey = () => {
    createApiKey.mutate();
  };

  return (
    <BaseBackground>
      {createApiKey.isSuccess && (
        <div className="text-xl text-white">
          <span className="text-[hsl(280,100%,70%)]">API key: </span>{" "}
          <span>{createApiKey.data}</span>
        </div>
      )}
      <Button onClick={generateApiKey}>Click Here to generate API Key</Button>

      <div className="text-xl text-white ">
        <span className="text-[hsl(280,100%,70%)]"> API endpoine: </span>
        /api/trpc/apiPlayground.apiKeyTest
      </div>
    </BaseBackground>
  );
};

export default ApiPlayground;
