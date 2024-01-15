const shader_objectVertex=`#version 300 es
struct Camera
{
	vec4 spin;
	vec3 pos;
};

layout (location = 0) in vec3 pos;
layout (location = 1) in vec2 tex;
layout (location = 2) in vec3 nor;

uniform mat4 projection;
uniform mat4 transform;
uniform Camera cam;

out vec2 fragTex;
out vec3 fragNor;

vec4 quatRotate(vec4 action, vec4 victim)
{
	float ar = action.w;	float br = victim.w;
	vec3 av = action.xyz;	vec3 bv = victim.xyz;
	return vec4(ar*bv + br*av + cross(av,bv), ar*br - dot(av,bv));
}


void main()
{
	vec3 position = pos;
    vec4 objectPos = vec4(position,1);
    vec4 worldPos = transform * objectPos;
  

	vec3 viewPos = worldPos.xyz - cam.pos;
	vec4 quatView = vec4(viewPos,0);
	vec4 spinQuat = vec4(-cam.spin.xyz, cam.spin.w);
	vec4 spinQuatInv = vec4(cam.spin);

	quatView = quatRotate(quatView, spinQuatInv);
	quatView = quatRotate(spinQuat, quatView);

	vec4 projectedPos = projection * vec4(quatView.xyz,1.0);


	gl_Position = projectedPos;

  fragTex = vec2(tex.x, 1.0 - tex.y);
	vec3 normal = nor;
	fragNor = normalize((transform * vec4(normal,0.0) ).xyz) ;
}
`;

const shader_objectFragment=`#version 300 es

precision highp float;

struct DirectionalLight
{
	vec3 direction;
	vec3 color;
};

in vec2 fragTex;
in vec3 fragNor;

out vec4 outColor;
uniform sampler2D albedo;
uniform DirectionalLight sun;

void main()
{
  
  vec4 colorV4 = texture(albedo,fragTex);
  if(colorV4.a < 0.1)
    discard;
  vec3 color = colorV4.rgb;
  vec3 toLight = -normalize(sun.direction);	
	float diffuse = max(dot(toLight,fragNor),0.1);
	vec3 diffuseColor = diffuse*sun.color;
  color = diffuseColor * color;
  outColor = vec4(color,1.0);
  

}`;
