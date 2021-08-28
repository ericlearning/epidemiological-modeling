import numpy as np
import matplotlib.pyplot as plt
from euler import euler
from improved import improved_euler
from rungekutta import rungekutta
from scipy.integrate import odeint
from models import SIR, SIRS, SEIR

# create SIR model
beta = 0.7
gamma = 0.2
init = np.array([1200, 1, 0])
model = SIR(beta, gamma, init.sum())
model_type = 'SIR'

# create SIRS model
beta = 0.6
gamma = 0.1
tau = 0.3
init = np.array([1200, 1, 0])
model = SIRS(beta, gamma, tau, init.sum())
model_type = 'SIRS'

# create SEIR model
beta = 0.6
gamma = 0.1
delta = 0.3
init = np.array([1200, 0, 1, 0])
model = SEIR(beta, gamma, delta, init.sum())
model_type = 'SEIR'

# step size 0.1
h = 0.1

# evaluate t between t_min and t_max
t_min, t_max = 0, 100
t = np.linspace(t_min, t_max, num=int((t_max-t_min)/h))

# solve the ODE
out = odeint(model.interact, init, t).T

if model_type in ['SIR', 'SIRS']:
    S, I, R = out
    plt.plot(t, S, color='blue')
    plt.plot(t, I, color='red')
    plt.plot(t, R, color='green')

if model_type in ['SEIR']:
    S, E, I, R = out
    plt.plot(t, S, color='blue')
    plt.plot(t, E, color='orange')
    plt.plot(t, I, color='red')
    plt.plot(t, R, color='green')

plt.show()