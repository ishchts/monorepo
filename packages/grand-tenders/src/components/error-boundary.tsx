import React, { Component } from 'react';

class ErrorBoundary extends Component<{}, { hasError: boolean }> {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error: {hasError: boolean}) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    console.log('error', error)
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.log(error, errorInfo);
  }

  render() {
    console.log('state', this.state)

    if (this.state.hasError) {
      return (
        <div>Что-то пошло не так, вернуться на главную страницу</div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary;