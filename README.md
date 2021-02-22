# Base React

### iniciar App
- npm install
- npm start

- **Cero-dependencia**
- **No** componentes de clase
- Utiliza `Context` para compartir un **estado global**
- Utiliza `useReducer` para gestionar **acciones de estado**
- `useState` para crear un estado local
- Lógica de estado desacoplado (Acciones)
- Componentes comprobables (Utiliza Jest + Enzyme para pruebas)
- Ganchos personalizados para **estado persistente**.

## Summary

### 1. **Context**:

El enfoque principal es desplazar Redux y utilizar **React Contexts** en su lugar. Con la composición de `useState`,` useContext` para crear un estado global. Y lo pasó a un **hook personalizado** llamado `useTodos`. `useTodos` donde `useState` genera un administrador de estado que se pasará a `TodoContext.Provider` para usarlo como estado global.

### 2. **The reducer**:

El segundo enfoque fue separar la lógica principal, al igual que las **actions** de Redux. Pero estos son completamente funcionales, cada función devuelve el estado completo.

### 3. **State and Dispatcher**

Obtener los **state y dispatcher** del contexto usando `useContext` y puedo llegar a las `actions`.

### 4. **Persistence with custom hooks**:

Se crear un hook personalizados para mantener el estado en `localStorage`

### 5. **Everything is testable decoupled**:

La última pero más importante parte del enfoque es hacer que todas las partes sean comprobables. No se relacionan entre sí, lo que me hace escribir pruebas fácilmente.

## License
MIT
