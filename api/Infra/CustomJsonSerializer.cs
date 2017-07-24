using Nancy;
using Nancy.Responses.Negotiation;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ApiExemploAutenticacao.Infra
{
    public class CustomJsonSerializer : ISerializer
    {
        public IEnumerable<string> Extensions => new[] { "json", "applicaton/json", ".json" };

        public bool CanSerialize(MediaRange mediaRange)
        {
            return true;
        }

        public void Serialize<TModel>(MediaRange mediaRange, TModel model, Stream outputStream)
        {
            var settings = new JsonSerializerSettings()
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            var txt = JsonConvert.SerializeObject(model, settings);

            var bytes = Encoding.UTF8.GetBytes(txt);
            outputStream.Write(bytes, 0, bytes.Length);
        }
    }
}
