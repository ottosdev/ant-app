import { AxiosError } from "axios";
import instance from "../../service/api";

interface ResponseMessage {
  open: (props: {
    type: "success" | "error";
    content: string;
    duration: number;
  }) => void;
}

export const loginHandler = async (
  values: { email: string; password: string },
  setLoading: (loading: boolean) => void,
  responseMessage: ResponseMessage,
  navigate: (path: string) => void
): Promise<void> => {
  setLoading(true);
  await instance
    .post("/sessions", values)
    .then((res) => {
      localStorage.setItem("@token", res.data.access_token);
      responseMessage.open({
        type: "success",
        content: "Seja bem vindo ao nosso sistema",
        duration: 3,
      });
      navigate("/dashboard");
    })
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) {
        responseMessage.open({
          type: "error",
          content: err.response.statusText + " - Email / Password invalid",
          duration: 3,
        });
      } else {
        responseMessage.open({
          type: "error",
          content: "Something Wrong Happen",
          duration: 3,
        });
      }
    })
    .finally(() => {
      setLoading(false);
    });
};
