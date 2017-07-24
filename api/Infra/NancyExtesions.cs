using Nancy;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace ApiExemploAutenticacao.Infra
{
    public static class NancyExtensions
    {
        public static Response JsonResponse<TModel>(this NancyModule module, TModel data)
        {
            var settings = new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            var json = JsonConvert.SerializeObject(data, settings);
            return module.Response.AsText(json, "application/json", Encoding.UTF8);
        }

        public async static Task<TModel> JsonRequestToObjectAsync<TModel>(this NancyModule module)
        {
            var reader = new StreamReader(module.Request.Body);
            var json = await reader.ReadToEndAsync();
            var obj = JsonConvert.DeserializeObject<TModel>(json);

            return obj;
        }

    }
}
