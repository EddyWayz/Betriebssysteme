# Lernportal Betriebssysteme

Dieses Repository enthält eine statische Website zur Vorbereitung auf die Klausur im Fach Betriebssysteme. Jede HTML-Datei bildet eines der Vorlesungskapitel ab und kann über die Navigation aufgerufen werden.
Über das Suchfeld in der Navigation lassen sich Kapitel schnell auffinden.

## Inhaltsverzeichnis

- [Übersicht](index.html)
- [1. Einführung & Überblick](01_einfuehrung.html)
- [2. Grundlagen](02_grundlagen.html)
- [3. Prozesse](03_prozesse.html)
- [4. Threads](04_threads.html)
- [5. CPU-Scheduling](05_scheduling.html)
- [6. Synchronisation](06_synchronisation.html)
- [7. Kommunikation](07_kommunikation.html)
- [8. Deadlocks](08_deadlocks.html)
- [9. Speicherverwaltung](09_speicherverwaltung.html)
- [10. Dateisysteme](10_dateisysteme.html)
- [11. E/A-Verwaltung](11_ea-verwaltung.html)
- [12. Sicherheit](12_sicherheit.html)
- [13. Virtualisierung](13_virtualisierung.html)
- [Übungen](uebungen.html)

## Projekt lokal starten

Die Seiten können direkt im Browser geöffnet werden. Für ein komfortableres Arbeiten empfiehlt sich ein kleiner lokaler Webserver, z.B. mit Python:

```bash
python3 -m http.server
```

Danach ist die Seite unter <http://localhost:8000> erreichbar.

Im Ordner `material` liegen zusätzliche PDFs und Beispielcode, die das Studium unterstützen. Unter `examples` findest du kleine, kommentierte C-Programme, die Themen wie Prozess- und Thread-Synchronisation illustrieren.

Nach jedem Kapitel findet sich nun eine kleine Quizfrage, mit der du dein Wissen testen kannst.

## Navigation aus Templates erzeugen

Die Navigationsleiste wird aus einer Vorlage generiert. Die Links befinden sich in `scripts/nav_items.json`. Ein Makefile sowie ein Git-Hook sorgen automatisch dafür, dass `nav.html` stets aktuell ist:

```bash
make nav
```
Beim Committen wird `scripts/pre-commit.sh` ausgeführt und erzeugt die Datei bei Änderungen am JSON.


## Tests ausführen

Zur Qualitätssicherung liegen im Ordner `tests` mehrere Python-Skripte.
`check_lang.py` stellt sicher, dass alle HTML-Dateien ein `lang`-Attribut besitzen.
`check_alt.py` überprüft, ob sämtliche Bilder ein `alt`-Attribut haben.
`check_links.py` validiert interne Links zwischen den Seiten.

Ausführen lassen sich die Tests mit:

```bash
python3 tests/check_lang.py
python3 tests/check_alt.py
python3 tests/check_links.py
```

Bei jedem Push werden diese Tests auch automatisch per GitHub Actions ausgeführt (siehe `.github/workflows/tests.yml`).
