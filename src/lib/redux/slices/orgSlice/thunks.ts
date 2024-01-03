import axios from "@/src/lib/config/axios.config";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const fetchOrgs = createAppAsyncThunk("org/fetch", async () => {
  try {
    const QUERY = `
      query GetOrgs {
        getOrgs {
          id
          name
          type
          email
          password
          phone
          location
          images
          media
        }
      }
    `;
    const orgs = await axios.post("/", {
      query: QUERY,
      variables: {},
    });

    if (orgs.data.errors) {
      throw new Error(orgs.data.errors[0].message);
    }

    if (orgs.data.data) {
      return orgs.data.data.getOrgs;
    }
  } catch (error: any) {
    throw new Error(error);
  }
});
