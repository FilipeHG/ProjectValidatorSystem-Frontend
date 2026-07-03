import { describe, it, expect } from 'vitest';
import { projectFormSchema } from '../../src/schemas/project.schema';

describe('Project Form Schema', () => {
  it('should validate a correct project payload', () => {
    const validData = {
      nome: 'Projeto X',
      dataDeInicio: '2025-01-01',
      previsaoDeTermino: '2025-12-31',
      orcamentoTotal: 100000,
      descricao: 'Descrição do projeto X',
    };
    const result = projectFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should invalidate if previsaoDeTermino is before dataDeInicio', () => {
    const invalidData = {
      nome: 'Projeto X',
      dataDeInicio: '2025-12-31',
      previsaoDeTermino: '2025-01-01',
      orcamentoTotal: 100000,
      descricao: 'Descrição do projeto X',
    };
    const result = projectFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('A previsão de término deve ser maior ou igual à data de início.');
    }
  });
});
