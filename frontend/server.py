#!/usr/bin/env python3
"""
Servidor HTTP simple para servir archivos estáticos del frontend
"""
import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def do_GET(self):
        # Si no hay extensión, servir index.html
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        elif '.' not in self.path.split('/')[-1]:
            # Si no tiene extensión, asumir que es index.html
            self.path = self.path + '/index.html' if not self.path.endswith('/') else self.path + 'index.html'
        
        return super().do_GET()
    
    def log_message(self, format, *args):
        # Mejorar formato de logs
        print(f"[{self.log_date_time_string()}] {format % args}")

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"\n{'='*60}")
        print(f"🚀 Servidor Frontend Ecofort Market")
        print(f"{'='*60}")
        print(f"📁 Sirviendo desde: {DIRECTORY}")
        print(f"🌐 URL: http://localhost:{PORT}")
        print(f"{'='*60}\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n⛔ Servidor detenido")
            sys.exit(0)
