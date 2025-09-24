import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  INodeInputConfiguration,
  NodeConnectionType,
} from "n8n-workflow";

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Random Number",
    name: "random",
    group: ["transform"],
    version: 1,
    description: "Generates a true random number using Random.org API",
    defaults: {
      name: "Random Number",
    },
    inputs: ["main"] as (NodeConnectionType | INodeInputConfiguration)[], // A estrutura simples e correta que a ferramenta gerou
    outputs: ["main"] as NodeConnectionType[], // A estrutura simples e correta que a ferramenta gerou
    properties: [
      // Nossos campos customizados que adicionamos
      {
        displayName: "Minimum Value",
        name: "minValue",
        type: "number",
        default: 1,
        required: true,
        description: "The minimum integer value (inclusive)",
      },
      {
        displayName: "Maximum Value",
        name: "maxValue",
        type: "number",
        default: 100,
        required: true,
        description: "The maximum integer value (inclusive)",
      },
    ],
  };

  // Nossa lógica final para executar o nó
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const minValue = this.getNodeParameter("minValue", 0) as number;
    const maxValue = this.getNodeParameter("maxValue", 0) as number;

    const url = `https://www.random.org/integers/?num=1&min=${minValue}&max=${maxValue}&col=1&base=10&format=plain&rnd=new`;

    const response = await this.helpers.httpRequest({ url, json: false });

    const result = {
      randomNumber: Number(response),
    };

    return [this.helpers.returnJsonArray([result])];
  }
}
