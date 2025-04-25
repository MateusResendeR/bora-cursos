# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Deployment na Vercel

Este projeto está configurado para funcionar corretamente quando hospedado na Vercel ou plataformas similares.

### Configurações importantes

Para garantir que as rotas funcionem corretamente em produção, dois arquivos foram adicionados:

1. `vercel.json` - Configura redirecionamentos na Vercel para rotas de SPA
2. `public/_redirects` - Adiciona suporte a redirecionamentos para Netlify e outras plataformas

Essas configurações garantem que, quando um usuário acessa diretamente uma URL como `/curso/nome-do-curso`, a aplicação será carregada corretamente, em vez de retornar um erro 404.

### Verificação de deploy

Se você estiver tendo problemas com rotas após o deploy:

1. Verifique se os arquivos `vercel.json` e `public/_redirects` estão presentes no deploy
2. Certifique-se de que as configurações da sua plataforma de hospedagem estão corretas
3. Para a Vercel, geralmente não é necessária nenhuma configuração adicional além do arquivo `vercel.json`
