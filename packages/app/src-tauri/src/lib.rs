use tauri::{Manager, Window};
use std::sync::{Arc, Mutex};

// State to track dev mode
struct AppState {
    dev_mode: Arc<Mutex<bool>>,
}

#[tauri::command]
fn set_click_through(window: Window, enabled: bool) -> Result<(), String> {
    window.set_ignore_cursor_events(enabled)
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn move_character(window: Window, x: i32, y: i32) -> Result<(), String> {
    window.set_position(tauri::Position::Physical(tauri::PhysicalPosition { x, y }))
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn get_screen_size() -> Result<(u32, u32), String> {
    // Get primary monitor size
    // In production, this would use platform-specific APIs
    // For now, return a default screen size
    Ok((1920, 1080))
}

#[tauri::command]
fn set_dev_mode(state: tauri::State<AppState>, enabled: bool) -> Result<(), String> {
    let mut dev_mode = state.dev_mode.lock().map_err(|e| e.to_string())?;
    *dev_mode = enabled;
    Ok(())
}

#[tauri::command]
fn is_dev_mode(state: tauri::State<AppState>) -> Result<bool, String> {
    let dev_mode = state.dev_mode.lock().map_err(|e| e.to_string())?;
    Ok(*dev_mode)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app_state = AppState {
        dev_mode: Arc::new(Mutex::new(false)),
    };

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            set_click_through,
            move_character,
            get_screen_size,
            set_dev_mode,
            is_dev_mode
        ])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            // Set initial click-through state
            let _ = window.set_ignore_cursor_events(true);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
