export const proxyRequestDictionary = async (word : string) => {
    try {
        const app_id = process.env.OX_APP_ID!.valueOf();
        const app_key = process.env.OX_APP_KEY!.valueOf();
        const language = "en-gb";
        
        const options = {
            method: "GET",
            headers: {
              app_id: app_id,
              app_key: app_key,
            },
        };
        
        const apiurl = `https://od-api.oxforddictionaries.com:443/api/v2/entries/${language}/${word.toLowerCase()}`;
        const result = await fetch(apiurl, options);
        const json = await result.json();

        console.log(json);

        return {
            status: "success",
            payload: json,
        };
    }
    catch (e) {
      console.log(e);
    }
  
    return {
      status: "fail",
    };
  }
  