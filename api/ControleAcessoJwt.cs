using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nancy.Bootstrapper;
using Nancy.Authentication.Stateless;
using System.Security.Claims;
using Nancy;
using Jose;
using System.Text;

namespace ApiExemploAutenticacao
{
    public class ControleAcessoJwt
    {

        const string CHAVE_TOKEN = "NrXA4yH1qx3Tvng4IMcmEIlG1oqYGrRn";
        const int TEMPO_MAX_ACESSO = 1;
        private readonly static byte[] BytesChaveToken = Encoding.UTF8.GetBytes(CHAVE_TOKEN);

        public static void Config(IPipelines pipelines)
        {

            var configuration = new StatelessAuthenticationConfiguration(ValidarToken);
 
            StatelessAuthentication.Enable(pipelines, configuration);

        }

        public static string GerarToken(TokenInfo info)
        {
            info.exp = DateTimeOffset.Now.AddMinutes(TEMPO_MAX_ACESSO).ToUnixTimeSeconds();
            var token = Jose.JWT.Encode(info, BytesChaveToken,JwsAlgorithm.HS256);
            return token;
        }

        public static double ConvertToUnixTimestamp(DateTime date)
        {
           
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            TimeSpan diff = date.ToUniversalTime() - origin;
            return Math.Floor(diff.TotalSeconds);
        }

        private static ClaimsPrincipal ValidarToken(NancyContext ctx)
        {
            var jwtToken = ctx.Request.Headers.Authorization;

            try
            {
                var partes = jwtToken.Split(' ');
                string token;

                if (partes.Length == 2)
                {
                    token = partes[1];
                } else
                {
                    token = jwtToken;
                }

                var tokenInfo = Jose.JWT.Decode<TokenInfo>(token, BytesChaveToken, JwsAlgorithm.HS256);
                var tempoAcesso = DateTime.Now - tokenInfo.DataAcesso;

                // invalida o token caso o tempo máximo tenha sido alcançado
                if (tempoAcesso.TotalMinutes >= TEMPO_MAX_ACESSO)
                {
                    return null;
                }

                return new ClaimsPrincipal(new[] { new ClaimsIdentity("token-valido") });

            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
