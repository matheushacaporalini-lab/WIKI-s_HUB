# Script para atualizar arquivos no GitHub
# Uso: .\push-github.ps1

# Mudar para o diretório do projeto
cd c:\matheus\TCC

# Verificar status do git
Write-Host "Verificando status do repositório..." -ForegroundColor Cyan
git status

# Adicionar todos os arquivos
Write-Host "`nAdicionando arquivos..." -ForegroundColor Yellow
git add .

# Fazer commit
Write-Host "`nFazendo commit..." -ForegroundColor Yellow
$mensagem = "Atualização de arquivos - $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')"
git commit -m $mensagem

# Sincronizar com repositório remoto
Write-Host "`nSincronizando com repositório remoto..." -ForegroundColor Yellow
git pull

# Enviar para GitHub
Write-Host "`nEnviando para GitHub..." -ForegroundColor Yellow
git push origin main

# Status final
Write-Host "`nStatus final:" -ForegroundColor Green
git status

Write-Host "`n✅ Concluído! Seus arquivos foram atualizados no GitHub." -ForegroundColor Green
