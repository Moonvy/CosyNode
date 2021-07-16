use std::process::{Command, Stdio};
use std::env;
use std::env::consts::OS;


fn main() {
    // nodejs file path
    let mut exe_path = std::env::current_exe().unwrap();
    exe_path.pop();
    exe_path.push("res");

    if OS == "windows"{
        exe_path.push("node.exe");
        if !exe_path.exists(){
            println!("NOT FOUND ./res/node.exe");
        }
    }  else {
        exe_path.push("node");
        if !exe_path.exists(){
            println!("NOT FOUND ./res/node");
        }
    }


  
    // index.js file path
    let mut js_path = std::env::current_exe().unwrap();
    js_path.pop();
    js_path.push("res");
    js_path.push("index.js");

    if !js_path.exists(){
        println!("NOT FOUND ./res/index.js");
    }

    // index.js file path
    let mut pwd_path = std::env::current_exe().unwrap();
    pwd_path.pop();
    env::set_current_dir(&pwd_path);


    let exe_path_str = exe_path.as_path().display().to_string();
    let js_path_str = js_path.as_path().display().to_string();


    let args = env::args().skip(1).collect::<Vec<_>>();

    // println!("exe_path_str: {}", exe_path_str);
    // println!("js_path_str: {}", js_path_str);
    // println!("args: {:?}", args);


    Command::new(exe_path_str)
    .arg(js_path_str)
    .args(args)
    .stdin(Stdio::inherit())
    .stdout(Stdio::inherit())
    .spawn()
    .expect("Failed to spawn child process")
    .wait();

    // println!("end.");
}
