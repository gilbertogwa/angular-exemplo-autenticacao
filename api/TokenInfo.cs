using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiExemploAutenticacao
{
    public class TokenInfo
    {
        public string Usuario { get; set; }
        public DateTime DataAcesso { get; set; }
        public double exp { get; set; }
    }
}
