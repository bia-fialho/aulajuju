class PedidoDTO {
    constructor(cliente, telefone, doce, bebida, precoBebida, preco) {
        this.cliente = cliente;
        this.telefone = telefone;
        this.doce = doce;
        this.bebida = bebida;
        this.precoBebida = precoBebida;
        this.preco = preco;
    }

    validar() {
        if (!this.cliente) {
            throw new Error("Nome obrigatório");
        }

        if (!this.doce) {
            throw new Error("Doce obrigatório");
        }

        if (!this.telefone) {
            throw new Error("Telefone obrigatório");
        }

        if (isNaN(this.preco) || this.preco <= 0) {
            throw new Error("Preço do doce inválido");
        }

        if (isNaN(this.precoBebida) || this.precoBebida < 0) {
            throw new Error("Preço da bebida inválido");
        }

        return true;
    }
}

let pedidos = [];

const precos = {
    "Brigadeiro": 15,
    "Bolo de Cenoura": 35,
    "Bolo de Laranja": 40,
    "Palha Italiana": 25,
    "Copo da Felicidade": 30
};

const precosBebida = {
    "Sprite": 10,
    "Suco de Maracujá": 20,
    "Água": 10
};

document.getElementById("doce").addEventListener("change", function () {
    document.getElementById("preco").value = precos[this.value] || "";
});

document.getElementById("bebida").addEventListener("change", function () {
    document.getElementById("precoBebida").value = precosBebida[this.value] || "";
});

function adicionarPedido() {
    try {
        const cliente = document.getElementById("cliente").value;
        const telefone = document.getElementById("telefone").value;
        const doce = document.getElementById("doce").value;
        const bebida = document.getElementById("bebida").value;

        const preco = parseFloat(document.getElementById("preco").value) || 0;
        const precoBebida = parseFloat(document.getElementById("precoBebida").value) || 0;

        const pedido = new PedidoDTO(cliente, telefone, doce, bebida, precoBebida, preco);
        pedido.validar();

        pedidos.push(pedido);

        atualizarLista();

        document.getElementById("cliente").value = "";
        document.getElementById("telefone").value = "";
        document.getElementById("doce").value = "";
        document.getElementById("bebida").value = "";
        document.getElementById("preco").value = "";
        document.getElementById("precoBebida").value = "";

    } catch (erro) {
        alert(erro.message);
    }
}

function atualizarLista() {
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    pedidos.forEach((p) => {
        const li = document.createElement("li");

        li.innerHTML = `
            Cliente: ${p.cliente} <br>
            Doce: ${p.doce} <br>
            Bebida: ${p.bebida} <br>
            Preço Doce: R$ ${p.preco.toFixed(2)} <br>
            Preço Bebida: R$ ${p.precoBebida.toFixed(2)}
        `;

        lista.appendChild(li);
    });

    const total = pedidos.reduce((soma, p) => soma + p.preco + p.precoBebida, 0);

    document.getElementById("totalPedidos").innerText =
        "Total: R$ " + total.toFixed(2);
}